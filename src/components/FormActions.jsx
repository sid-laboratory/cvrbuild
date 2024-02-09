export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
}) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F05454] hover:bg-[#F05454] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F05454] mt-10 font-press-start-2p"
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
