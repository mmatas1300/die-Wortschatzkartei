'use client'
import Link from 'next/link'

function WorterbuchPage() {

    const alphaNum = Array.from(Array(26)).map((e, i) => i + 65);
    alphaNum.splice(23, 2)


    return (
        <><form className="max-w-md mx-auto mt-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required=""
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      
        <div className="flex flex-row justify-center items-center flex-wrap mt-4">
            {alphaNum.map((x) => {
                return(
                    <Link key={x} href={`/worterbuch/${String.fromCharCode(x)}`} className='bg-orange-card hover:bg-yellow-card w-32 h-32 m-3 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110'>
                        {String.fromCharCode(x)}
                    </Link>
                )
            })}
        </div>
        </>
    );
    
}

export default WorterbuchPage
