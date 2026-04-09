import Image from "next/image";
import React from "react";
import HeadingTypography from "../HeadingTypography";

const stats = [
  { value: "44 million", label: "Transactions every 24 hours" },
  { value: "$119 trillion", label: "Assets under holding" },
  { value: "46,000", label: "New users annually" },
];

export default function MissionSection() {
  return (
    <section className="">
      {/* Top: Two-column — text left, stats right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Mission text */}
        <div className="flex flex-col gap-6">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-primary"></span>
            Our mission
          </h2>
          <HeadingTypography>Mission of our company</HeadingTypography>
          <p className="text-gray-600 text-base leading-relaxed">
            To consistently develop IT solutions that provide our clients with a
            competitive advantage, facilitating their achievement of success
            milestones.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            To consistently develop IT solutions that provide our clients with a
            competitive advantage, facilitating their achievement of success
            milestones.
          </p>
        </div>

        {/* Right: Stats */}
        <div className="flex flex-col justify-center gap-8 lg:pl-8">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-1">
              <span className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Full-width rounded image */}
      <div className="w-full rounded-3xl overflow-hidden h-[420px] md:h-[500px]">
        {/* <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
          alt="Group of friends with arms around each other"
          className="w-full h-full object-cover object-center"
        /> */}
        <Image
          src="/assets/about-us/about-us-team.jpg"
          alt="Group of friends with arms around each other"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover object-bottom"
        />
      </div>
    </section>
  );
}
