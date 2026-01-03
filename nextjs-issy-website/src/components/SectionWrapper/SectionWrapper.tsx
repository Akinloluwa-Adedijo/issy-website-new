import React from "react";

type SectionWrapperProps = {
  title: string;
  children: React.ReactNode;
};

const SectionWrapper = ({ title, children }: SectionWrapperProps) => {
  return (
    <section className="flex flex-col gap-10 p-6">
      <h1 className="text-5xl md:text-6xl lg:text-[8vw] uppercase">{title}</h1>
      {children}
    </section>
  );
};
export default SectionWrapper;
