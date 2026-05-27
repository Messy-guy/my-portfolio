export default {
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    {
      name: "bio",
      title: "Biography Text",
      type: "text",
      rows: 4,
      initialValue: "I am Animesh Poudel. An aspiring frontend & mobile developer building immersive software that doesn't just work—it feels alive."
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true
      }
    }
  ]
};
