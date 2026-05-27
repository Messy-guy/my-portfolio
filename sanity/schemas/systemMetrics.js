export default {
  name: "systemMetrics",
  title: "System Metrics",
  type: "document",
  fields: [
    {
      name: "codingStreak",
      title: "Coding Streak Days",
      type: "number",
      initialValue: 124
    },
    {
      name: "activeProjectsCount",
      title: "Active Projects Count",
      type: "number",
      initialValue: 12
    },
    {
      name: "techRadarData",
      title: "Tech Radar Points",
      type: "array",
      of: [
        {
          type: "object",
          name: "radarItem",
          fields: [
            { name: "subject", title: "Technology Name", type: "string" },
            { name: "A", title: "Proficiency Index (Max 150)", type: "number" },
            { name: "fullMark", title: "Full Mark (e.g. 150)", type: "number" }
          ]
        }
      ]
    }
  ]
};
