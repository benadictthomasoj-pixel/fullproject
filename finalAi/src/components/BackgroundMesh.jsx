import React from 'react';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none bg-[#FCFDFE]">
      {/* Mesh Circle 1 - Sky Blue */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#38BDF8]/15 to-[#0EA5E9]/5 blur-[120px] animate-mesh-1"
      />
      
      {/* Mesh Circle 2 - Soft Indigo/Purple */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-[#818CF8]/10 to-[#C084FC]/5 blur-[130px] animate-mesh-2"
      />
      
      {/* Mesh Circle 3 - Subtle Turquoise */}
      <div 
        className="absolute top-[30%] right-[15%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-[#2DD4BF]/8 to-[#38BDF8]/5 blur-[110px] animate-mesh-3"
      />

      {/* Grid Pattern overlay for depth */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />
    </div>
  );
}
