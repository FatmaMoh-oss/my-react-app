interface Prop {
  fill: string;
  stroke: string;
}

const Center = ({ fill, stroke }: Prop) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H19C19.4142 1.75 19.75 1.41421 19.75 1C19.75 0.585786 19.4142 0.25 19 0.25H1Z"
        fill={fill}
      />
      <path
        d="M6 6.25C5.58579 6.25 5.25 6.58579 5.25 7C5.25 7.41421 5.58579 7.75 6 7.75H14C14.4142 7.75 14.75 7.41421 14.75 7C14.75 6.58579 14.4142 6.25 14 6.25H6Z"
        fill={fill}
      />
      <path
        d="M0.25 13C0.25 12.5858 0.585786 12.25 1 12.25H19C19.4142 12.25 19.75 12.5858 19.75 13C19.75 13.4142 19.4142 13.75 19 13.75H1C0.585786 13.75 0.25 13.4142 0.25 13Z"
        fill={fill}
      />
      <path
        d="M6 18.25C5.58579 18.25 5.25 18.5858 5.25 19C5.25 19.4142 5.58579 19.75 6 19.75H14C14.4142 19.75 14.75 19.4142 14.75 19C14.75 18.5858 14.4142 18.25 14 18.25H6Z"
        fill={fill}
      />
      <path
        d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H19C19.4142 1.75 19.75 1.41421 19.75 1C19.75 0.585786 19.4142 0.25 19 0.25H1Z"
        stroke={stroke}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.25C5.58579 6.25 5.25 6.58579 5.25 7C5.25 7.41421 5.58579 7.75 6 7.75H14C14.4142 7.75 14.75 7.41421 14.75 7C14.75 6.58579 14.4142 6.25 14 6.25H6Z"
        stroke={stroke}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.25 13C0.25 12.5858 0.585786 12.25 1 12.25H19C19.4142 12.25 19.75 12.5858 19.75 13C19.75 13.4142 19.4142 13.75 19 13.75H1C0.585786 13.75 0.25 13.4142 0.25 13Z"
        stroke={stroke}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 18.25C5.58579 18.25 5.25 18.5858 5.25 19C5.25 19.4142 5.58579 19.75 6 19.75H14C14.4142 19.75 14.75 19.4142 14.75 19C14.75 18.5858 14.4142 18.25 14 18.25H6Z"
        stroke={stroke}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Center;
