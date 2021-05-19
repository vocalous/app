import React, { useEffect } from 'react';
import qs from 'qs';

import { useStoreActions } from '../../model';
import { decodeS1 } from '../../services/s1Encoding';

const readMelodyNotes = () => {
  const params = qs.parse(window.location.search.substr(1));
  if (params.s1) {
    try {
      return decodeS1(params.s1);
    } catch (error) {
      alert(error.toString());
    }
  }
};

export function AppFrame({ children }: { children: React.ReactNode }) {
  const { setMelodyNotes } = useStoreActions((actions) => actions);
  useEffect(() => {
    const notes = readMelodyNotes();
    if (notes) {
      setMelodyNotes(notes);
    }
  }, [setMelodyNotes]);

  return (
    <React.Fragment>
      <div className="main-container">{children}</div>
    </React.Fragment>
  );
}
