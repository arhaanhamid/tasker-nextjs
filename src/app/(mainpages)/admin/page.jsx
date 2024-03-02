import { Suspense } from "react";
import AdminUsers from "@/components/adminUsers/AdminUsers";
import AdminUserForm from "@/components/adminUserForm/AdminUserForm";

const AdminPage = async () => {
  return (
    <div className="mt-0 mr-0 md:mt-2 md:mr-2 lg:mt-5 lg:mr-5 flex flex-col md:flex-row lg:flex-row gap-5 justify-between">
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <AdminUsers />
        </Suspense>
      </div>
      <div className="w-full">
        <AdminUserForm />
      </div>
    </div>
  );
};

export default AdminPage;
