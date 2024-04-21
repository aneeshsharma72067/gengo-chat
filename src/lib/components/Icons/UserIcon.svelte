<script>
  export let size = 46;
  export let fill = "white";
  export let strokeColor = "black";
  export let strokeWidth = 0;
</script>

<svg
  width={size}
  height={size}
  stroke={strokeColor}
  {fill}
  stroke-width={strokeWidth}
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm.094 4.5a3.375 3.375 0 1 1 0 6.75 3.375 3.375 0 0 1 0-6.75ZM12 20.25a8.23 8.23 0 0 1-6.055-2.653C6.359 15.45 10.08 15 12 15s5.64.45 6.055 2.596A8.228 8.228 0 0 1 12 20.25Z"
  ></path>
</svg>
