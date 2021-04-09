import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";
import { videoData } from "../data";
faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      video: Model,
      likedVideo: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("videos");
      this.resource("likedVideos");
    },

    seeds(server) {
      videoData.forEach((item) => {
        server.create("video", {
          id: item.id,
          name: item.name,
          category:item.category
        });
      });
    }
  });
}
