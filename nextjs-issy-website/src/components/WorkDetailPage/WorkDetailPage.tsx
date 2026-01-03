import {
  useLocation,
  Link,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CustomImage from "../CustomImage/CustomImage";
import { workData } from "../../data/data";
import PasswordModal from "../PasswordModal/PasswordModal";
import { useState, useEffect } from "react";
import VideoPlayer from "../VideoSection/VideoSection";

const WorkDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { workTitle } = useParams();
  const detailData = location.state;
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // If no state data (browser refresh), try to find project by URL
  let project;
  if (detailData?.project) {
    project = detailData.project;
  } else if (workTitle) {
    // Find the project by matching the URL format
    project = workData.find(
      (p) => p.title.toLowerCase().replace(/\s+/g, "-") === workTitle
    );
  }

  // If no project found, redirect to works page
  if (!project) {
    return <Navigate to="/works" replace />;
  }

  // Check if this is the password protected project
  const isPasswordProtected = project.title === "In the Night I Dream";

  // Check if user is authenticated for this project
  useEffect(() => {
    const authStatus = localStorage.getItem("in-the-night-i-dream-auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSuccess = () => {
    localStorage.setItem("in-the-night-i-dream-auth", "true");
    setIsAuthenticated(true);

    // Find the "In the Night I Dream" project
    const inTheNightProject = workData.find(
      (p) => p.title === "In the Night I Dream"
    );
    if (inTheNightProject) {
      // Navigate to the project page with proper state
      navigate(
        `/works/${inTheNightProject.title.toLowerCase().replace(/\s+/g, "-")}`,
        {
          state: { project: inTheNightProject },
        }
      );
    }
  };

  // If it's password protected and no state data (direct navigation) and not authenticated, redirect to works
  if (isPasswordProtected && !detailData?.project && !isAuthenticated) {
    return <Navigate to="/works" replace />;
  }

  console.log(project);

  // Find current project index
  const currentProjectIndex = workData.findIndex(
    (projectItem) => projectItem.title === project.title
  );

  // Calculate next and previous indices with wrap-around
  const nextProjectIndex = (currentProjectIndex + 1) % workData.length;
  const prevProjectIndex =
    currentProjectIndex === 0 ? workData.length - 1 : currentProjectIndex - 1;

  const nextProject = workData[nextProjectIndex];
  const prevProject = workData[prevProjectIndex];

  // Function to handle navigation clicks for password protected projects
  const handleNavigationClick = (e: React.MouseEvent, targetProject: any) => {
    if (targetProject.title === "In the Night I Dream" && !isAuthenticated) {
      e.preventDefault();
      setShowPasswordModal(true);
    }
  };

  return (
    <main>
      <section className="p-5 flex flex-col gap-20">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-2">
            <h1
              className="text-3xl md:text-4xl lg:text-[5vw] max-w-7xl uppercase"
              style={{
                color: `var(--color-${project.accentColor})`,
              }}
            >
              {project.title}
            </h1>
            <p className="text-neutral-400 text-lg">{project.year}</p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Role Section */}
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-4xl font-medium mb-2">Role</h2>
              <p className="text-neutral-400 text-lg">
                {project.roleDescription}
              </p>
            </div>
            {project.collaborators && (
              <div>
                <h3 className="text-4xl font-medium">Collaborators</h3>
                <ul className="list-none  text-neutral-400 text-lg">
                  {project.collaborators.map(
                    (collaborator: string, index: number) => (
                      <li key={index}>{collaborator}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-10">
            {project.description && (
              <>
                {project.description.map((desc: string, index: number) => (
                  <p key={index} className="text-white text-lg">
                    {desc}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>

        {project.video && (
          // <div className="w-full h-[350px]">
          <>
            {console.log(project.video)}
            <VideoPlayer
              // src={project.video.vidSrc}
              vidSrc={project.video.vidSrc}
              poster={project.video.thumbnail}
            />
          </>
          // </div>
        )}

        {/* Reference Images */}
        {project.referenceImages && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <h2 className="text-4xl font-medium">Inspiration</h2>
            <div className="col-span-2">
              <>
                {project.referenceImages.map(
                  (
                    image: {
                      imgSrc: string;
                      imgAlt: string;
                      imgWidth: number;
                      imgHeight: number;
                      containerClassname?: string;
                    },
                    index: number
                  ) => (
                    <CustomImage
                      key={index}
                      imgSrc={image.imgSrc}
                      imgAlt={image.imgAlt}
                      width={image.imgWidth}
                      height={image.imgHeight}
                    />
                  )
                )}
              </>
            </div>
          </div>
        )}

        {/* Final Images */}
        {project.finalImages && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16">
            <h2 className="text-4xl font-medium">Execution</h2>
            <div className="col-span-2">
              <>
                {project.finalImages.map(
                  (
                    image: {
                      imgSrc: string;
                      imgAlt: string;
                      imgWidth: number;
                      imgHeight: number;
                      containerClassname?: string;
                    },
                    index: number
                  ) => (
                    <CustomImage
                      key={index}
                      imgSrc={image.imgSrc}
                      imgAlt={image.imgAlt}
                      width={image.imgWidth}
                      height={image.imgHeight}
                    />
                  )
                )}
              </>
            </div>
          </div>
        )}

        {/* Project with just Images */}
        {project.shootImages && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <>
              {project.shootImages.map(
                (
                  image: {
                    imgSrc: string;
                    imgAlt: string;
                    imgWidth: number;
                    imgHeight: number;
                    containerClassname?: string;
                  },
                  index: number
                ) => (
                  <CustomImage
                    key={index}
                    imgSrc={image.imgSrc}
                    imgAlt={image.imgAlt}
                    width={image.imgWidth}
                    height={image.imgHeight}
                  />
                )
              )}
            </>
          </div>
        )}
        {/* Project with just Images */}
        {project.upcomingImages && (
          <div className="grid grid-cols-1 gap-5">
            <>
              {project.upcomingImages.map(
                (
                  image: {
                    imgSrc: string;
                    imgAlt: string;
                    imgWidth: number;
                    imgHeight: number;
                    containerClassname?: string;
                  },
                  index: number
                ) => (
                  <CustomImage
                    key={index}
                    imgSrc={image.imgSrc}
                    imgAlt={image.imgAlt}
                    width={image.imgWidth}
                    height={image.imgHeight}
                  />
                )
              )}
            </>
          </div>
        )}

        {project.externalLink && (
          <div className="w-full pt-20">
            <a
              href={`${project.externalLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:bg-neutral-900  p-5 border text-3xl"
              style={{
                color: `var(--color-${project.accentColor})`,
              }}
            >
              View Full Video
            </a>
          </div>
        )}

        {/* Project Navigation */}
        <div className="flex justify-between items-center pt-10 border-t border-neutral-800">
          <Link
            to={`/works/${prevProject.title
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            state={{ project: prevProject }}
            className="flex flex-col gap-2 hover:opacity-70 transition-opacity"
            onClick={(e) => handleNavigationClick(e, prevProject)}
          >
            <span className="text-sm text-neutral-400">Previous Project</span>
            <span className="text-lg font-medium">{prevProject.title}</span>
          </Link>

          <Link
            to={`/works/${nextProject.title
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            state={{ project: nextProject }}
            className="flex flex-col gap-2 hover:opacity-70 transition-opacity text-right"
            onClick={(e) => handleNavigationClick(e, nextProject)}
          >
            <span className="text-sm text-neutral-400">Next Project</span>
            <span className="text-lg font-medium">{nextProject.title}</span>
          </Link>
        </div>

        {/* Password Modal */}
        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          projectTitle="In the Night I Dream"
          onPasswordSuccess={handlePasswordSuccess}
        />
      </section>
    </main>
  );
};

export default WorkDetailPage;
