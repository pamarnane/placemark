export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Placemark",
        };
        return h.view("about", viewData);
      },
    },
  };