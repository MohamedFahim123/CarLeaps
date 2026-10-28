import {
  CarRecord,
  DealerRecord,
  delay,
  getMockDb,
  nextId,
  paginateCars,
  saveMockDb,
  slugify,
  stripDealerPassword,
} from "./db";

export type MockRequestConfig = {
  method?: string;
  url?: string;
  data?: unknown;
  headers?: Record<string, unknown>;
  params?: unknown;
};

export type MockResponse = {
  data: unknown;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: unknown;
};

function ok(data: unknown, config: unknown, status = 200): MockResponse {
  return {
    data,
    status,
    statusText: status === 200 ? "OK" : "Created",
    headers: { "content-type": "application/json" },
    config,
  };
}

function fail(
  message: string,
  status: number,
  config: unknown,
  errors?: Record<string, string[]>
): MockResponse {
  return {
    data: errors ? { message, errors } : { message },
    status,
    statusText: status === 404 ? "Not Found" : "Error",
    headers: { "content-type": "application/json" },
    config,
  };
}

function parsePath(url?: string): string {
  if (!url) return "";
  try {
    const withoutQuery = url.split("?")[0];
    const marker = "/api";
    const idx = withoutQuery.indexOf(marker);
    if (idx >= 0) {
      return withoutQuery.slice(idx + marker.length).replace(/\/+$/, "") || "/";
    }
    return withoutQuery.replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function headerValue(
  headers: Record<string, unknown> | undefined,
  key: string
): string {
  if (!headers) return "";
  const lower = key.toLowerCase();
  for (const [k, v] of Object.entries(headers)) {
    if (k.toLowerCase() === lower) {
      if (Array.isArray(v)) return String(v[0] ?? "");
      return String(v ?? "");
    }
  }
  return "";
}

function getBearerToken(headers?: Record<string, unknown>): string | null {
  const auth = headerValue(headers, "Authorization") || headerValue(headers, "authorization");
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

function bodyAsObject(data: unknown): Record<string, unknown> {
  if (!data) return {};
  if (typeof FormData !== "undefined" && data instanceof FormData) {
    const out: Record<string, unknown> = {};
    data.forEach((value, key) => {
      if (out[key] !== undefined) {
        const prev = out[key];
        out[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
      } else {
        out[key] = value;
      }
    });
    return out;
  }
  if (typeof data === "string") {
    try {
      return JSON.parse(data) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (typeof data === "object") {
    return data as Record<string, unknown>;
  }
  return {};
}

function requireAuth(
  headers: Record<string, unknown> | undefined,
  config: unknown
): { dealerId: number } | MockResponse {
  const token = getBearerToken(headers);
  if (!token) {
    return fail("Unauthenticated", 401, config);
  }
  const db = getMockDb();
  const dealerId = db.sessions[token];
  if (!dealerId) {
    return fail("Invalid token", 401, config);
  }
  return { dealerId };
}

function equalsLoose(a: unknown, b: unknown): boolean {
  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

function filterCars(
  cars: CarRecord[],
  filters: Record<string, unknown>
): CarRecord[] {
  const db = getMockDb();

  return cars.filter((car) => {
    if (filters.condition && !equalsLoose(car.condition, filters.condition)) {
      return false;
    }
    if (
      filters.make &&
      !equalsLoose(car.make, filters.make) &&
      String(car.make_id) !== String(filters.make)
    ) {
      return false;
    }
    if (
      filters.model &&
      !equalsLoose(car.model, filters.model) &&
      String(car.model_id) !== String(filters.model)
    ) {
      return false;
    }
    if (filters.fuel_type) {
      const fuelFilter = String(filters.fuel_type);
      const fuelById = db.fuelTypes.find(
        (ft) => String(ft.id) === fuelFilter
      );
      const matchesName = equalsLoose(car.fuel_type, fuelFilter);
      const matchesId =
        !!fuelById && equalsLoose(car.fuel_type, fuelById.name);
      if (!matchesName && !matchesId) return false;
    }
    if (
      filters.body &&
      !equalsLoose(car.body, filters.body) &&
      String(car.body_id) !== String(filters.body)
    ) {
      return false;
    }
    if (filters.ad_state) {
      const adFilter = String(filters.ad_state);
      const adById = db.adStates.find((a) => String(a.id) === adFilter);
      const matchesName = equalsLoose(car.ad_state, adFilter);
      const matchesId = !!adById && equalsLoose(car.ad_state, adById.name);
      if (!matchesName && !matchesId) return false;
    }
    if (filters.make_id && String(car.make_id) !== String(filters.make_id)) {
      return false;
    }
    return true;
  });
}

function searchCarsByKeyword(cars: CarRecord[], keyword: string): CarRecord[] {
  const q = keyword.toLowerCase().trim();
  if (!q) return cars;
  return cars.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.make.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.vin.toLowerCase().includes(q)
  );
}

function decodeSegment(value: string): string {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

function findCarBySlug(slug: string): CarRecord | undefined {
  const db = getMockDb();
  const raw = decodeSegment(String(slug || "").trim());
  const normalized = slugify(raw);

  return db.cars.find((c) => {
    const name = String(c.name || "");
    return (
      String(c.id) === raw ||
      String(c.id) === slug ||
      name.toLowerCase() === raw.toLowerCase() ||
      slugify(name) === normalized
    );
  });
}

function createToken(): string {
  return `mock-token-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function carsListingPayload(cars: CarRecord[]) {
  const db = getMockDb();
  return {
    data: {
      cars,
      bodies: db.bodies,
      models: db.models.map((m) => ({
        id: m.id,
        name: m.name,
        image: m.image,
        make: m.make,
        make_id: m.make_id,
      })),
      makes: db.makes,
    },
  };
}

async function routeRequest(config: MockRequestConfig): Promise<MockResponse> {
  // Keep client UX loading states; skip artificial latency on the server.
  const isServer = typeof window === "undefined";
  await delay(isServer ? 0 : 250);

  const method = (config.method || "get").toLowerCase();
  const path = parsePath(config.url);
  const body = bodyAsObject(config.data);
  const db = getMockDb();

  // ——— GET ———
  if (method === "get") {
    if (path === "/cities") return ok({ data: db.cities }, config);
    if (path === "/interests") return ok({ data: db.interests }, config);
    if (path === "/research-makes") return ok({ data: db.researchMakes }, config);
    if (path === "/authorized-cars") return ok({ data: db.authorizedCars }, config);
    if (path === "/featured-items") return ok({ data: db.featuredItems }, config);
    if (path === "/ad-states") return ok({ data: db.adStates }, config);
    if (path === "/models") return ok({ data: db.models }, config);
    if (path === "/trims") return ok({ data: db.trims }, config);
    if (path === "/bodies") return ok({ data: db.bodies }, config);
    if (path === "/countries") return ok({ data: db.countries }, config);
    if (path === "/programs") return ok({ data: db.cpoPrograms }, config);
    if (path === "/features") return ok({ data: db.features }, config);
    if (path === "/footer-taps") return ok({ data: db.footerTaps }, config);
    if (path === "/fuel-types") return ok({ data: db.fuelTypes }, config);
    if (path === "/makes") return ok({ data: db.makes }, config);
    if (path === "/transmissions") return ok({ data: db.transmissions }, config);
    if (path === "/years") return ok({ data: db.years }, config);
    if (path === "/conditions") {
      return ok({ data: { condition: db.conditions } }, config);
    }

    if (path === "/dealer/profile") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const dealer = db.dealers.find((d) => d.id === auth.dealerId);
      if (!dealer) return fail("Dealer not found", 404, config);
      return ok({ data: { dealer: stripDealerPassword(dealer) } }, config);
    }

    if (path === "/dealer/active-cars") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const cars = db.dealerActiveCars.filter((c) => c.dealer.id === auth.dealerId);
      return ok({ data: paginateCars(cars) }, config);
    }

    if (path === "/dealer/pending-cars") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const cars = db.dealerPendingCars.filter((c) => c.dealer.id === auth.dealerId);
      return ok({ data: paginateCars(cars) }, config);
    }

    if (path === "/dealer/deactive-cars") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const cars = db.dealerDeactiveCars.filter((c) => c.dealer.id === auth.dealerId);
      return ok({ data: paginateCars(cars) }, config);
    }

    const dealerMatch = path.match(/^\/dealers\/([^/]+)$/);
    if (dealerMatch) {
      const dealerId = Number(dealerMatch[1]);
      const dealer = db.dealers.find((d) => d.id === dealerId);
      if (!dealer) return fail("Dealer not found", 404, config);
      const dealerCars = db.cars.filter((c) => c.dealer.id === dealerId);
      return ok(
        {
          data: {
            ...stripDealerPassword(dealer),
            cars: dealerCars,
          },
        },
        config
      );
    }
  }

  // ——— POST ———
  if (method === "post") {
    if (path === "/cars") {
      const filtered = filterCars(db.cars, body);
      return ok(carsListingPayload(filtered), config);
    }

    if (path === "/cpo-cars") {
      const makeId = body.make_id ? Number(body.make_id) : null;
      let source = db.cars.filter(
        (c) => c.condition === "Certified" || c.condition === "Used"
      );
      if (makeId) source = source.filter((c) => c.make_id === makeId);

      const byBody = db.bodies
        .map((bodyItem) => ({
          body_id: bodyItem.id,
          body_name: bodyItem.name,
          cars: source.filter((c) => c.body_id === bodyItem.id),
        }))
        .filter((g) => g.cars.length > 0);

      return ok({ data: byBody }, config);
    }

    if (path === "/research-bodies") {
      const makeId = Number(body.make_id);
      const payload = db.researchBodies[makeId] || {
        id: makeId,
        name: "Unknown",
        image: "",
        models: [],
      };
      return ok({ data: payload }, config);
    }

    if (path === "/dealer/login") {
      const email = String(body.email || "").toLowerCase();
      const password = String(body.password || "");
      const dealer = db.dealers.find((d) => d.email.toLowerCase() === email);
      if (!dealer || dealer.password !== password) {
        return fail("The given data was invalid.", 422, config, {
          email: ["These credentials do not match our records."],
          password: ["Invalid password."],
        });
      }
      const token = createToken();
      db.sessions[token] = dealer.id;
      saveMockDb();
      return ok(
        { message: "Login Successful!", data: { token } },
        config
      );
    }

    if (path === "/dealer/register") {
      const email = String(body.email || "").toLowerCase();
      if (!email || !body.password || !body.name) {
        return fail("The given data was invalid.", 422, config, {
          email: !email ? ["Email is required."] : [],
          password: !body.password ? ["Password is required."] : [],
          name: !body.name ? ["Name is required."] : [],
        });
      }
      if (db.dealers.some((d) => d.email.toLowerCase() === email)) {
        return fail("The given data was invalid.", 422, config, {
          email: ["The email has already been taken."],
        });
      }
      const id = nextId();
      const countryId = Number(body.country_id || 1);
      const country = db.countries.find((c) => c.id === countryId);
      const dealer: DealerRecord = {
        id,
        name: String(body.name),
        email,
        phone: String(body.phone || ""),
        whatsapp: String(body.phone || ""),
        bio: "New dealer on CarLeaps.",
        address: "",
        sales_hours: "Mon-Fri 9:00-17:00",
        status: "active",
        type: String(body.type || "dealer"),
        country_id: countryId,
        country_name: country?.name || "United Kingdom",
        locale: "en",
        cover: "/images/resource/coverImage.png",
        image: "/images/resource/dealer1-3.jpg",
        documents: [],
        password: String(body.password),
      };
      db.dealers.push(dealer);
      const token = createToken();
      db.sessions[token] = dealer.id;
      saveMockDb();
      return ok(
        { message: "Registration Successful!", data: { token } },
        config
      );
    }

    if (path === "/dealer/logout") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const token = getBearerToken(config.headers);
      if (token) delete db.sessions[token];
      saveMockDb();
      return ok({ message: "Logged out successfully" }, config);
    }

    if (path === "/dealer/store-car") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const dealer = db.dealers.find((d) => d.id === auth.dealerId);
      if (!dealer) return fail("Dealer not found", 404, config);

      const make = db.makes.find((m) => String(m.id) === String(body.make_id));
      const model = db.models.find((m) => String(m.id) === String(body.model_id));
      const trim = db.trims.find((t) => String(t.id) === String(body.trim_id));
      const bodyType = db.bodies.find((b) => String(b.id) === String(body.body_id));
      const year = db.years.find((y) => String(y.id) === String(body.year_id));
      const transmission = db.transmissions.find(
        (t) => String(t.id) === String(body.transmission_id)
      );
      const city = db.cities.find((c) => String(c.id) === String(body.city_id));
      const country = db.countries.find(
        (c) => String(c.id) === String(body.country_id || dealer.country_id)
      );

      const id = nextId();
      const name =
        String(body.name || "") ||
        `${make?.name || "Car"} ${model?.name || ""} ${year?.name || ""}`.trim();
      const mainImage = "/images/resource/deal1-1.png";
      const newCar: CarRecord = {
        id,
        name,
        condition: String(body.condition || "Used"),
        dealer: { ...stripDealerPassword(dealer), cars: [] },
        body: bodyType?.name || "Sedan",
        make: make?.name || "Audi",
        model: model?.name || "A4",
        trim: trim?.name || "Premium",
        transmission: transmission?.name || "Automatic",
        year: year?.name || "2024",
        country: country?.name || dealer.country_name,
        city: city?.name || "London",
        body_id: Number(body.body_id || 1),
        make_id: Number(body.make_id || 1),
        model_id: Number(body.model_id || 1),
        trim_id: Number(body.trim_id || 1),
        transmission_id: Number(body.transmission_id || 1),
        year_id: Number(body.year_id || 2),
        country_id: Number(body.country_id || dealer.country_id),
        city_id: Number(body.city_id || 1),
        price: Number(body.price || 0),
        currency: city?.currency || "GBP",
        offer_price: Number(body.offer_price || body.price || 0),
        mileage: Number(body.mileage || 0),
        drive_type: String(body.drive_type || "AWD"),
        exterior: String(body.exterior || "White"),
        interior: String(body.interior || "Black"),
        vin: String(body.vin || `MOCKVIN${id}`),
        engine: String(body.engine || "2.0"),
        fuel_type: String(body.fuel_type || "Petrol"),
        ad_state: "For Sale",
        added_at: new Date().toISOString(),
        description: String(body.description || "New listing pending approval."),
        video_link: String(body.video_link || ""),
        status: "pending",
        main_image: mainImage,
        history: "/images/resource/gallery1-1.jpg",
        lat: Number(body.lat || 51.5074),
        lng: Number(body.lng || -0.1278),
        features: [
          ...db.features.comfort,
          ...db.features.seats,
          ...db.features.safety,
          ...db.features.entertainment,
        ].slice(0, 6),
        carImagesCount: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: "",
        carImages: [{ image: mainImage }],
      };

      db.cars.unshift(newCar);
      db.dealerPendingCars.unshift(newCar);
      saveMockDb();
      return ok({ message: "Car stored successfully", data: newCar }, config);
    }

    if (path === "/dealer/update-profile") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const dealer = db.dealers.find((d) => d.id === auth.dealerId);
      if (!dealer) return fail("Dealer not found", 404, config);

      if (body.name !== undefined) dealer.name = String(body.name);
      if (body.email !== undefined) dealer.email = String(body.email);
      if (body.phone !== undefined) dealer.phone = String(body.phone);
      if (body.whatsapp !== undefined) dealer.whatsapp = String(body.whatsapp);
      if (body.bio !== undefined) dealer.bio = String(body.bio);
      if (body.address !== undefined) dealer.address = String(body.address);
      if (body.sales_hours !== undefined) {
        dealer.sales_hours = String(body.sales_hours);
      }
      if (body.type !== undefined) dealer.type = String(body.type);
      if (body.locale !== undefined) dealer.locale = String(body.locale);
      if (body.country_id !== undefined) {
        dealer.country_id = Number(body.country_id);
        const country = db.countries.find((c) => c.id === dealer.country_id);
        if (country) dealer.country_name = country.name;
      }

      // Reflect dealer changes onto cars
      for (const car of db.cars) {
        if (car.dealer.id === dealer.id) {
          car.dealer = { ...stripDealerPassword(dealer), cars: [] };
        }
      }
      saveMockDb();
      return ok(
        {
          message: "Profile updated successfully",
          data: { dealer: stripDealerPassword(dealer) },
        },
        config
      );
    }

    if (path === "/dealer/search-active-cars") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const keyword = String(body.name || body.keyword || "");
      const cars = searchCarsByKeyword(
        db.dealerActiveCars.filter((c) => c.dealer.id === auth.dealerId),
        keyword
      );
      return ok({ data: paginateCars(cars) }, config);
    }

    if (path === "/dealer/search-pending-cars") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const keyword = String(body.name || body.keyword || "");
      const cars = searchCarsByKeyword(
        db.dealerPendingCars.filter((c) => c.dealer.id === auth.dealerId),
        keyword
      );
      return ok({ data: paginateCars(cars) }, config);
    }

    if (path === "/dealer/search-deactive-cars") {
      const auth = requireAuth(config.headers, config);
      if ("status" in auth) return auth;
      const keyword = String(body.name || body.keyword || "");
      const cars = searchCarsByKeyword(
        db.dealerDeactiveCars.filter((c) => c.dealer.id === auth.dealerId),
        keyword
      );
      return ok({ data: paginateCars(cars) }, config);
    }

    if (path === "/get-cities") {
      const countryId = String(body.country_id || "");
      const cities = db.cities.filter(
        (c) => !countryId || String(c.country_id) === countryId
      );
      return ok({ data: cities }, config);
    }

    if (path === "/get-model") {
      const makeId = String(body.make_id || "");
      const models = db.models.filter(
        (m) => !makeId || String(m.make_id) === makeId
      );
      return ok({ data: models }, config);
    }

    if (path === "/get-trim") {
      const modelId = String(body.model_id || "");
      const trims = db.trims.filter(
        (t) => !modelId || String(t.model_id) === modelId
      );
      return ok({ data: trims }, config);
    }

    if (path === "/find-car") {
      return ok(
        { message: "Your request has been submitted successfully", data: body },
        config
      );
    }

    if (path === "/sell-car") {
      return ok(
        { message: "Your sell request has been submitted successfully", data: {} },
        config
      );
    }

    if (path === "/cars/perfect/match/search") {
      let models = db.models.map((m) => ({
        cover: m.cover,
        end_price: String(m.end_price || 50000),
        gallery: m.gallery,
        image: m.image,
        make: m.make,
        make_id: m.make_id,
        name: m.name,
        specifications: m.specifications.map((s) => s.title),
        start_price: String(m.start_price || 30000),
        status: m.status,
      }));

      if (Array.isArray(body.body) && body.body.length > 0) {
        const bodyIds = body.body.map(String);
        models = models.filter((m) => {
          const full = db.models.find((x) => x.name === m.name);
          return full?.specifications.some(
            (s) =>
              bodyIds.includes(String(s.body_id)) ||
              bodyIds.includes(String(s.body))
          );
        });
      }

      if (Array.isArray(body.interest) && body.interest.length > 0) {
        const interestIds = body.interest.map(String);
        models = models.filter((m) => {
          const full = db.models.find((x) => x.name === m.name);
          return full?.specifications.some((s) =>
            (s.interests || []).some((i: { id: number }) =>
              interestIds.includes(String(i.id))
            )
          );
        });
      }

      if (body.price_from !== undefined) {
        const from = Number(body.price_from);
        models = models.filter((m) => Number(m.end_price) >= from);
      }
      if (body.price_to !== undefined) {
        const to = Number(body.price_to);
        models = models.filter((m) => Number(m.start_price) <= to);
      }

      return ok(
        {
          data: {
            models,
            current_page: 1,
            last_page: 1,
          },
        },
        config
      );
    }

    if (path === "/car/show") {
      const slug = String(body.slug || body.id || "");
      const car = findCarBySlug(slug);
      if (!car) return fail("Car not found", 404, config);
      const related = db.cars
        .filter((c) => c.id !== car.id && (c.make_id === car.make_id || c.body_id === car.body_id))
        .slice(0, 4);
      return ok({ data: { car, related_cars: related } }, config);
    }

    if (path === "/dealer/forget-password") {
      const email = String(body.email || "").toLowerCase();
      const dealer = db.dealers.find((d) => d.email.toLowerCase() === email);
      if (!dealer) {
        // Still return success to avoid email enumeration in mock UX,
        // but also accept unknown emails as soft success.
        return ok(
          {
            message:
              "If the email exists, a reset link has been sent.",
            data: {},
          },
          config
        );
      }
      const token = `reset-${createToken()}`;
      db.forgetPasswordTokens[token] = dealer.email;
      saveMockDb();
      return ok(
        {
          message: "Password reset instructions sent.",
          data: { token },
        },
        config
      );
    }

    if (path === "/dealer/reset-password") {
      const token = String(body.token || "");
      const password = String(body.password || "");
      const confirmation = String(body.password_confirmation || "");
      const email = db.forgetPasswordTokens[token];
      if (!token || !email) {
        return fail("Invalid or expired reset token.", 422, config, {
          token: ["Invalid reset token."],
        });
      }
      if (!password || password.length < 6) {
        return fail("The given data was invalid.", 422, config, {
          password: ["Password must be at least 6 characters."],
        });
      }
      if (password !== confirmation) {
        return fail("The given data was invalid.", 422, config, {
          password_confirmation: ["Password confirmation does not match."],
        });
      }
      const dealer = db.dealers.find((d) => d.email === email);
      if (!dealer) return fail("Dealer not found", 404, config);
      dealer.password = password;
      delete db.forgetPasswordTokens[token];
      saveMockDb();
      return ok({ message: "Password reset successfully", data: {} }, config);
    }
  }

  return fail("Endpoint not defined", 404, config);
}

export async function handleMockRequest(
  config: MockRequestConfig
): Promise<MockResponse> {
  return routeRequest(config);
}

export async function handleMockFetch(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const headers: Record<string, unknown> = {};
  if (init?.headers) {
    if (init.headers instanceof Headers) {
      init.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(init.headers)) {
      for (const [key, value] of init.headers) headers[key] = value;
    } else {
      Object.assign(headers, init.headers);
    }
  }

  const result = await handleMockRequest({
    method: init?.method || "GET",
    url,
    data: init?.body ?? undefined,
    headers,
  });

  return new Response(JSON.stringify(result.data), {
    status: result.status,
    statusText: result.statusText,
    headers: result.headers,
  });
}
