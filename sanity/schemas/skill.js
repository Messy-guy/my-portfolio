export default {
  name: "skill",
  title: "Skills (Tech Stack)",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Skill Name",
      type: "string"
    },
    {
      name: "code",
      title: "Typewriter Code Snippet",
      type: "text",
      rows: 4
    },
    {
      name: "logo",
      title: "SVG Outline Logo",
      type: "image"
    },
    {
      name: "logoClass",
      title: "Logo Style Class (e.g. logo-outline)",
      type: "string",
      initialValue: "logo-outline"
    },
    {
      name: "colorHex",
      title: "Branded Hex Code Color (e.g. #61DAFB)",
      type: "string"
    },
    {
      name: "color",
      title: "Tailwind Color Class Name (e.g. text-[#61DAFB])",
      type: "string"
    }
  ]
};
