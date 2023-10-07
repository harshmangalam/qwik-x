import { component$ } from "@builder.io/qwik";
import { Svg } from "~/components/ui/svg";

export const SuggestionOutlineIcon = component$(() => (
  <Svg>
    <svg
      color="black"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V17.4C21 17.7314 20.7314 18 20.4 18H16.2592C16.0938 18 15.9357 18.0683 15.8223 18.1888L12.4369 21.7858C12.2 22.0375 11.8 22.0375 11.5631 21.7858L8.17768 18.1888C8.06429 18.0683 7.90619 18 7.74076 18H3.6C3.26863 18 3 17.7314 3 17.4V3.6Z"
        stroke="#000000"
        stroke-width="1.5"
      />
      <path
        d="M12 7L13.4254 9.57457L16 11L13.4254 12.4254L12 15L10.5746 12.4254L8 11L10.5746 9.57457L12 7Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Svg>
));

export const SuggestionIcon = component$(() => (
  <Svg>
    <svg
      viewBox="-2.4 -2.4 28.80 28.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0">
        <rect
          x="-2.4"
          y="-2.4"
          width="28.80"
          height="28.80"
          rx="14.4"
          fill="#000000"
          strokewidth="0"
        />
      </g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M3 3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V17.4C21 17.7314 20.7314 18 20.4 18H16.2592C16.0938 18 15.9357 18.0683 15.8223 18.1888L12.4369 21.7858C12.2 22.0375 11.8 22.0375 11.5631 21.7858L8.17768 18.1888C8.06429 18.0683 7.90619 18 7.74076 18H3.6C3.26863 18 3 17.7314 3 17.4V3.6Z"
          stroke="#ffffff"
          stroke-width="1.5"
        />{" "}
        <path
          d="M12 7L13.4254 9.57457L16 11L13.4254 12.4254L12 15L10.5746 12.4254L8 11L10.5746 9.57457L12 7Z"
          stroke="#ffffff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
      </g>
    </svg>
  </Svg>
));
