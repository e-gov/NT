import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { TFunction } from "i18next";



export const Explainer = (props: { arena: string; t: TFunction }) => {
  const [visible, setVisible] = useState(!window.localStorage.getItem("arena-explained-" + props.arena));

  const hide = (ev?: any) => {
    if (ev) { ev.preventDefault(); }
    window.localStorage.setItem("arena-explained-" + props.arena, "true");
    setVisible(false);
  };

  return (
    <>
      <Modal show={visible} onHide={hide} size="lg">
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: props.t(props.arena + '.arena-explained') }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>{props.t('close')}</Button>
        </Modal.Footer>
      </Modal>
      <Button className="btn badge mx-2" variant="secondary" title="Reopen explainer / ava seletav tekst uuesti" onClick={(ev: any) => { ev.preventDefault(); setVisible(true); }}>?</Button>
    </>
  );
}
