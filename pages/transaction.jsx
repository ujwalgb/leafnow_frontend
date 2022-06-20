/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function transaction() {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { query } = router;
  console.log(query);
  const { status } = query;
  React.useEffect(() => {
    if (status) {
      setMounted(true);
    }
  }, [query]);

  if (!mounted) {
    return null;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="transaction_wrapper flex flex-col items-center gap-5">
        <img
          src={`/${status === "success" ? "success" : "cancel"}.svg`}
          width="110"
          height="110"
        />
        <h1 className="text-2xl">
          {status === "success"
            ? "Thanks For donating"
            : "Your Transaction Cancelled"}
        </h1>
        <Link href="/">
          <a className="bg-black text-white flex items-center justify-center text-white py-3 px-3">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}

export default transaction;
