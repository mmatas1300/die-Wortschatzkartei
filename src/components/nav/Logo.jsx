import Link from "next/link";

const Logo = () => {
    return (
        <Link className="bg-black-card text-center rounded-2xl p-2 my-4 lg:p-3 mx-auto" href="/">
                <h1 className="text-lg lg:text-xl text-nowrap">
                    die Wortschatzkartei
                </h1>
        </Link>
    );
};

export default Logo;