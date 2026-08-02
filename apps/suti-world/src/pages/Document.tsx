import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Markdown from "../components/Markdown";
import { loadDocument } from "../lib/documents";

export default function Document() {

  const { slug } = useParams();

  const [text, setText] = useState("");

  useEffect(() => {

    if (!slug) return;

    loadDocument(slug)
      .then(setText)
      .catch(() => setText("# Document not found"));

  }, [slug]);

  return (
    <Markdown source={text}/>
  );
}
