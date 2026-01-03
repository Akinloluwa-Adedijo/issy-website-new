import { useState } from "react";
import { workData } from "../../data/data";
import Link from "next/link";
import PasswordModal from "../PasswordModal/PasswordModal";
import { useRouter } from "next/navigation";

interface WorkCardProps {
  project: workData;
  className?: string;
}


const WorkCard = ({ project, className }: WorkCardProps) => {
  // const [hover, setHover] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  // const isTablet = useTablet();
  // const navigate = useNavigate();

  // Check if this is the first work card (password protected)
  const isFirstWorkCard = project.title === workData[1].title;

  const handleCardClick = (e: React.MouseEvent) => {
    if (isFirstWorkCard) {
      e.preventDefault();
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSuccess = () => {
    localStorage.setItem("in-the-night-i-dream-auth", "true");

    // Navigate to the "In the Night I Dream" page with proper state
    // Link(`/works/${project.title.toLowerCase().replace(/\s+/g, "-")}`);
    router.push(`/works/${project.title.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <>
    <div className={`${className} relative`}>
      <Link
        href={`/works/${project.title.replace(/\s+/g, "-").toLowerCase()}`}
        onClick={handleCardClick}
        className={`flex flex-col gap-4 relative`}
      >
          <img src={project.cover?.[0]?.imgSrc ?? ""} alt={project.cover?.[0]?.imgAlt ?? ""} width={project.cover?.[0]?.imgWidth ?? 0} height={project.cover?.[0]?.imgHeight ?? 0} className="object-cover w-full" loading="lazy" />
        {/* </div> */}
          <div>
            <p className="text-xl">{project.title}</p>
            <p className="text-lg text-neutral-400">{project.category}</p>
          </div>
        {/* <div className={`relative ${(project.cover?.[0]?.imgWidth ?? 0) > (project.cover?.[0]?.imgHeight ?? 0) ? "aspect-video" : "aspect-[4/5]"}`}>
          <img src={project.cover?.[0]?.imgSrc ?? ""} alt={project.cover?.[0]?.imgAlt ?? ""} width={project.cover?.[0]?.imgWidth ?? 0} height={project.cover?.[0]?.imgHeight ?? 0} className="top-0 left-0 bottom-0 right-0 absolute object-cover  w-full" />
        </div>
          <div>
            <p className="text-xl">{project.title}</p>
            <p className="text-lg text-neutral-400">{project.category}</p>
          </div> */}
      </Link>
      </div>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        projectTitle={project.title}
        onPasswordSuccess={handlePasswordSuccess}
      />
    </>
  );
};

export default WorkCard;
