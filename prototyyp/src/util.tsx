import { createHash } from "crypto";
import React from "react";


export function hash(input: string): string {
  return createHash("sha256").update(input).digest("hex").substring(0, 6);
}

// converts transport address to organization id
export function address2org(address: string): string {
  let m = address.match("^([^/]+/[^/]+/[^/]+)(/.*)?$");
  if (m === null) {
    // not an X-Road member id or more specific address?
    return address;
  }

  return m[1];
}

// converts iso8601 timestamp string to unix timestamp
export function iso2epoch(ts: string): number {
  return new Date(ts).valueOf() / 1000;
}

// simple renderer that converts even number of spaces followed by an asterisk and a
// single space to a bullet of the bullet list. 
// for rendering declaration texts.
export function renderText(t: string) {
  type OutElement = { text: string; indent: number; children: OutElement[] };
  let stack: OutElement[] = [];

  function last(a: OutElement[]): OutElement {
    return a[a.length - 1];
  }

  stack.push({ text: "", indent: -1, children: [] });

  t.split("\n").forEach(l => {
    let pref = l.match("^((  )+\\* )(.*)$");
    if (pref === null) {
      pref = ["", "", "", l];
    }

    let prefix = pref[1];
    let text = pref[3];

    while (prefix.length <= last(stack).indent) {
      // the same level -> back up, so it will be actually a new level?
      stack.pop();
    }

    if (prefix.length > last(stack).indent) {
      // new level
      last(stack).children.push({ text: text, indent: prefix.length, children: [] })
      stack.push(last(last(stack).children));
    }
  });

  function ul(children: OutElement[]) {
    if (children.length === 0) {
      return <></>;
    }

    return (
      <ul className="desc-markup">
        {children.map(
          c => <li className="desc-markup">{c.text}{ul(c.children)}</li>
        )}
      </ul>
    );
  }

  return stack[0].children.map(
    c => <><p className="desc-markup">{c.text}</p>{ul(c.children)}</>
  );
}