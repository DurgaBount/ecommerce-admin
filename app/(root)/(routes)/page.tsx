"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  // Need only for super admin registration time
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className="bg-slate-100 h-full">
      {!isOpen && (
        <div>
          <UserButton />
          <p>You dont have access for any store, contact super admin</p>
        </div>
      )}
    </div>
  );
};

export default SetupPage;
