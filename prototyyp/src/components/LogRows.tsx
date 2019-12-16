import { Message, ProcessState, Payload } from "../process/Base";
import React from "react";
import { styleNameFor } from "../i18n";


export function receivers(receivers: string[]) {
  return receivers.length === 1 ? receivers[0] : `(${receivers.join(", ")})`;
}

function formatProcess(arena: string, name: string) {
  return (<span className={`msg-${styleNameFor(arena, name)}`}>
    {name}
  </span>)
}

function formatProcessList(arena: string, names: string[]) {
  if (names.length === 1) {
    return formatProcess(arena, names[0]);
  } else {
    return (<>({names.map(
      (r, i) => (
        <>{i === 0 ? ", " : undefined}{formatProcess(arena, r)}</>
      )
    )})</>)
  }
}

export function formatLogtime(epochSeconds: number): string {
  // locale. Swedes got it right. As did Lithuanians and few other countries. YYYY-MM-DD dates.
  return new Date(epochSeconds * 1000).toLocaleString("se");
}

function formatHeader(msg: Message<Payload>, owner: ProcessState<any> | undefined, showPopup: ShowPopup) {
  return (<>
    <span onClick={ev => showPopup(msg)}>
      <span className="link-underline">{formatLogtime(msg.now!)}</span>
      &nbsp;
            </span>
    {formatProcess(msg.arena, msg.sender)}
    <span> » </span>
    {formatProcessList(msg.arena, msg.receivers)}
  </>
  );
}

function cutJson(max: number) {
  return (key: string, value: any) => (
    typeof value !== "string"
      ? value
      : (value.length > max ? value.substring(0, max) + "..." : value)
  );
}

function formatBody<M extends Payload>(msg: M) {
  return `${msg.type}: ${JSON.stringify({ ...msg, type: undefined, statusUpdateChannel: undefined }, cutJson(40), "  ")}`;
}

function defaultRenderer(msg: Message<any>, owner: ProcessState<any> | undefined, showPopup: ShowPopup) {
  return (<>{formatHeader(msg, owner, showPopup)}:<br />{formatBody(msg.message)}</>);
}

type ShowPopup = (m: Message<any>) => void;

export function LogRow(arena: string, i: number, msg: Message<any>, owner: (ProcessState<any> | undefined), showPopup: ShowPopup) {
  return (<span>{findLogRenderer(msg)(msg, owner, showPopup)}</span>);
}

export type LogRenderer = (msg: Message<any>, owner: ProcessState<any> | undefined, showPopup: ShowPopup) => any;
const renderers: { [arena: string]: { [type: string]: LogRenderer } } = {};

function findLogRenderer(msg: Message<any>): LogRenderer {
  if (renderers[msg.arena] === undefined) {
    return defaultRenderer;
  }

  if (renderers[msg.arena][msg.message.type] === undefined) {
    return defaultRenderer;
  }

  return renderers[msg.arena][msg.message.type];
}

export function addLogRenderer(arena: string, type: string, renderer: LogRenderer) {
  if (renderers[arena] === undefined) {
    renderers[arena] = {};
  }

  renderers[arena][type] = renderer;
}

export type LogRendererMap = { [type: string]: LogRenderer };

export function addLogRenderers(arena: string, r: LogRendererMap) {
  Object.keys(r).forEach(type => addLogRenderer(arena, type, r[type]))
}

////////////////////////

export const consentRefApiLogRenderers: LogRendererMap = {
  // "CS/getConsentReference": (a, m) => `Rakendus ${m.sender} kysib nousolekuteenuselt ${receivers(m.receivers)} nqusolekuviidet isiku ${m.message.subjectId} ja eesmargideklaratsiooni ${m.message.purposeDeclarationId} kohta.`
}
