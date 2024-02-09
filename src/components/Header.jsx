import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-1  ">
      <div className="flex justify-center ">
        <img src="/logo .png" alt="Logo" width="300px" />
      </div>

      <h2 className="mt-6 text-center text-xl font-extrabold text-white font-press-start-2p">
        {heading}
      </h2>
      <p className="mt-2  text-center text-sm text-white mt-5 font-press-start-2p">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className=" font-medium text-[#F05454] hover:text-[#F05454] font-press-start-2p  "
        >
          <p className="font-medium text-[#F05454] hover:text-[#F05454] font-press-start-2p mt-6">
            {linkName}
          </p>
        </Link>
      </p>
    </div>
  );
}
