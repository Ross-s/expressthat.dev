"use client";
export function ActionButton(props: {
    children: React.ReactNode;
    action: () => Promise<void>;
}) {
    return <a onClick={() => props.action()}>
        {props.children}
    </a>
}