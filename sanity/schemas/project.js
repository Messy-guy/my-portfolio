export default {
  name: "project",
  title: "Selected Works (Projects)",
  type: "document",
  fields: [
    {
      name: "id",
      title: "Project Index / ID (e.g. 01)",
      type: "string"
    },
    {
      name: "category",
      title: "Category Tag (e.g. EVENT APP)",
      type: "string"
    },
    {
      name: "title",
      title: "Project Title",
      type: "string"
    },
    {
      name: "desc",
      title: "Project Description",
      type: "text",
      rows: 3
    },
    {
      name: "tech",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "link",
      title: "GitHub / Demo Link",
      type: "string"
    },
    {
      name: "projectUrl",
      title: "Live Website / Demo URL (Optional)",
      type: "string"
    },
    {
      name: "img",
      title: "Project Cover Image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "video",
      title: "Project Showcase Video (Optional)",
      type: "file",
      options: {
        accept: "video/*"
      }
    },
    {
      name: "color",
      title: "Visual Theme Highlight Class (e.g. text-accent)",
      type: "string"
    }
  ]
};
