import { DiffEditor } from '@monaco-editor/react'

const MonacoEditor = ({ text }: { text: string }) => {
  return (
    <div style={{ width: '80vw', marginLeft: '50px' }} id="editorcontainer">
      <DiffEditor
        height="90vh"
        original={text}
        modified=""
        language="javascript"
        theme="vs-dark"
      />
    </div>
  )
}

export default MonacoEditor
