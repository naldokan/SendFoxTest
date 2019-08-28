import { Editor, RichUtils } from 'draft-js';

import React from 'react';
import { useRef } from 'react';

export function RichEditorExample(props) {
  const editorEl = useRef(null)

  function onChange( editorState ) {
    props.onChange('editorState', editorState);
  };

  function focus() {
    editorEl.current.focus();
  }

  function handleKeyCommand( command ) {
    const { editorState } = props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  function onTab( e ) {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, props.editorState, maxDepth));
  };
  function toggleInlineStyle( inlineStyle ) {
    onChange(
      RichUtils.toggleInlineStyle(props.editorState, inlineStyle)
    );
  };
  
  const { editorState } = props;
  
  let className = 'RichEditor-editor';
  
  return (
    <div className="RichEditor-root">
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={className} onClick={focus}>
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          onTab={onTab}
          ref={editorEl}
          spellCheck={true}
        />
      </div>
    </div>
  );
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function StyleButton(props) {
  function onToggle( e ) {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }
  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
}

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];
const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
