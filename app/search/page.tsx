"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { tinykeys } from "tinykeys";

export default function Search() {
  const router = useRouter();

  useEffect(() => {
    return tinykeys(window, {
      Escape: () => router.push("/"),
    });
  }, []);

  const [search, setSearch] = useState<string>("");

  const [results, setResults] = useState([]);

  function runSearch(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const query = encodeURIComponent(search);
    const data = fetch(`/api/search?query=${query}&nResults=2`, {
      method: "GET",
    });

    data
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center font-mono">
      <div>
        <form onSubmit={runSearch} className="block">
          <div>
            <input
              className="bg-gray-800 px-4 py-2 text-lg rounded-lg"
              autoFocus={true}
              value={search}
              onInput={(ev) => setSearch(ev.target.value)}
              placeholder="Search..."
            />
            <button className="bg-gray-700 px-4 py-2 text-lg rounded-lg ml-2">
              search
            </button>
          </div>
        </form>
        <div className="block">
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.id}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
