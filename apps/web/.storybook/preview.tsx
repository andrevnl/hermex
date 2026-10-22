import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/lib/fonts";
import "material-icons/iconfont/filled.css";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-sans antialiased`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: "Claro", value: "#ffffff" },
        primary: { name: "Laranja (busca)", value: "#e28634" },
        secondary: { name: "Azul (rodapé)", value: "#23384d" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "light" },
  },
};

export default preview;
