import { Fragment, useDefaultProps, useStyle } from "@builder.io/mitosis";

export default function CustomPopup(props: {
  children: any;
  backdrop?: boolean;
}) {
  useStyle(`
        .expressthat-backdrop {
            display: grid;
            position: fixed;
            z-index: 1060;
            inset: 0;
            box-sizing: border-box;
            grid-template-areas:
                "top-start top top-end"
                "center-start center center-end"
                "bottom-start bottom-center bottom-end";
            grid-template-rows: minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);
            height: 100%;
            padding: .625em;
            overflow-x: hidden;
            transition: background-color .1s;
            -webkit-overflow-scrolling: touch;
          }
          .expressthat-popup-container {
            display: grid;
            position: relative;
            box-sizing: border-box;
            grid-template-columns: minmax(0, 100%);
            width: 32em;
            max-width: 100%;
            padding: 0 0 1.25em;
            border: none;
            border-radius: 5px;
            background: #fff;
            color: hsl(0, 0%, 33%);
            font-family: inherit;
            font-size: 1rem;
            grid-column: 2;
            grid-row: 2;
            place-self: center center;
          }
          
          `);

  return (
    <Fragment>
      <div className="expressthat-backdrop" style={{
        backgroundColor: (props.backdrop ?? true) ? "rgba(0,0,0,0.4)" : "transparent",
      }}>
        <div className="expressthat-popup-container">{props.children}</div>
      </div>
    </Fragment>
  );
}
