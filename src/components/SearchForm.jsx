const SearchForm = ({handleSubmit, buttonDisable, style}) => {
    return (
        <form onSubmit={handleSubmit} className={style}>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-red-card" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input required type="search" name="search" data-test="SearchField" className="block w-full p-4 ps-10 text-sm" />
                <button disabled={buttonDisable} data-test="SearchButton" type="submit" className="absolute end-2.5 bottom-2 bg-green-card cursor-pointer px-4 py-2">Suchen</button>
            </div>
        </form>
    );
};

export default SearchForm;