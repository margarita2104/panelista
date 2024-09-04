import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import AvatarOrg from "../../assets/avatar-org.svg";

const OrganizerProfileCard = ({
  profile: { picture, company, experience, email, phone, firstName, lastName },
  onEdit,
  onDelete,
  onCreateEvent,
}) => {
  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen">
        <div className="flex py-12 px-20 mb-20 mx-auto bg-lighter rounded-3xl shadow-lg max-w-4xl">
          <div className="flex flex-col items-center w-1/3 ">
            <img
              src={picture || AvatarOrg}
              alt={`${firstName} ${lastName}`}
              className="w-40 h-40 rounded-full shadow-lg mb-8"
            />
            <a
              href={`mailto:${email}`}
              className="btn-blue-sm w-fit leading-10"
            >
              Email
            </a>
          </div>

          <div className="w-2/3 pl-24">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                {firstName} {lastName}
              </h1>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Company:</h2>
              <p>{company}</p>
            </div>

            {[
              { title: "Experience", content: experience },
              { title: "Phone", content: phone },
            ].map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
            <div className="flex space-x-4">
              <button className="btn-dark-xs " onClick={onCreateEvent}>
                Create event
              </button>
              <button className="btn-dark-xs " onClick={onEdit}>
                Edit profile
              </button>
              <button
                className="btn-dark-xs hover:bg-red-600"
                onClick={onDelete}
              >
                Delete profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerProfileCard;
