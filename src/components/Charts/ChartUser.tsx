
import React, { use } from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";

export default async function ChartUser() {

  const session = await auth();

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            User Session Data
          </h4>
          <h5>
            {session ? (
              <div>
                <pre>{JSON.stringify(session, null, 2)}</pre>
                <form action={async () => {
                  'use server';

                  await signOut();
                }}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='bordered'
                    startContent={<FaRegSmile size={20} />}
                  >
                    Sign out
                  </Button>
                </form>
              </div>
            ) : (
              <div>Not Signed In!</div>
            )}
          </h5>
        </div>
      </div>
    </div>
  );
};
