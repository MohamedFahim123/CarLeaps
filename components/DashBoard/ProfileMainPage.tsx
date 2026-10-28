"use client";

import { useCallback, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ProfileEdit from "./ProfileEdit";
import ProfileShow from "./ProfileShow";
import Sidebar from "./Sidebar";
import { ImCancelCircle } from "react-icons/im";
import { useProfileStore } from "@/app/store/profile";

export default function ProfileMainPage() {
  const [edit, setEdit] = useState<boolean>(false);
  const { profile } = useProfileStore();

  const handleUpdateEditing = useCallback(() => {
    setEdit(!edit);
  }, [edit]);

  return (
    <section className="dashboard-widget-two">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title d-flex justify-content-between">
              <div>
                <h3 className="title">Profile</h3>
              </div>
              {edit === true ? (
                <ImCancelCircle
                  className="pointe text-danger"
                  onClick={handleUpdateEditing}
                  size={30}
                />
              ) : (
                <FaRegEdit
                  className="pointer"
                  onClick={handleUpdateEditing}
                  size={30}
                />
              )}
            </div>

            {edit === false && <ProfileShow profile={profile} />}
            {edit === true && <ProfileEdit profile={profile} />}
          </div>
        </div>
      </div>
    </section>
  );
}
