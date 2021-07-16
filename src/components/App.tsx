import {useCallback, useState} from 'react';
import Navbar from './Navbar';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';


const App = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const  [finalContent, setFinalContent] = useState(null);

  const handleSubmit = () => {
    let finalContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setFinalContent(finalContentAsHTML);
    setEditorState("");
  }

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  const onListClick = useCallback((item: string) => {alert(item)}, [])


  return (
    <div>
      <Navbar items={['item1','item2']} onClick={onListClick}/>
App Component
      <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        />
      </div>

      <button onClick={handleSubmit}>
      Submit Post
      </button>

      <div className="final" dangerouslySetInnerHTML={createMarkup(finalContent)}></div>

    </div>

  );
}

export default App;
