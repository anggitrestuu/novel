"use client";
import { Github } from "@/ui/icons";
import Menu from "@/ui/menu";
import { Editor, EditorBubble } from "@novel/headless";
import {
  EditorContent,
  EditorExension,
  EditorExtenions,
} from "@novel/headless/src/components/editor";
import { starterKit } from "./_components/StarterKitExtension";
import { useState } from "react";
import { defaultEditorContent } from "./content";
import { horizontalRule } from "./_components/HorizontalRules";
import {
  taskItem,
  taskList,
  tiptapImage,
  tiptapLink,
  updatedImage,
} from "./_components/Others";
import { NodeSelector } from "./_components/selectors/node-selector";
import { LinkSelector } from "./_components/selectors/link-selector";
import { ColorSelector } from "./_components/selectors/color-selector";
import TextButtons from "./_components/selectors/text-buttons";

export default function Page() {
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
      <a
        href="https://github.com/steven-tey/novel"
        target="_blank"
        className="absolute bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
      >
        <Github />
      </a>
      <Menu />
      <Editor>
        <EditorExtenions>
          <EditorExension extension={starterKit} />
          <EditorExension extension={horizontalRule} />
          <EditorExension extension={tiptapLink} />
          <EditorExension extension={tiptapImage} />
          <EditorExension extension={updatedImage} />
          <EditorExension extension={taskList} />
          <EditorExension extension={taskItem} />
        </EditorExtenions>

        <div className="relative w-full max-w-screen-lg">
          <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
            {saveStatus}
          </div>
          <EditorContent
            content={defaultEditorContent}
            className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
            editorProps={{
              attributes: {
                class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
              },
            }}
            onUpdate={() => {
              setSaveStatus("Unsaved");
            }}
            // onDebouncedUpdate={() => {
            //   setSaveStatus("Saving...");
            //   // Simulate a delay in saving.
            //   setTimeout(() => {
            //     setSaveStatus("Saved");
            //   }, 500);
            // }}
          >
            <EditorBubble
              tippyOptions={{
                onHidden: () => {
                  setIsColorSelectorOpen(false);
                  setIsNodeSelectorOpen(false);
                  setIsLinkSelectorOpen(false);
                },
              }}
              className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl"
            >
              <NodeSelector
                isOpen={isNodeSelectorOpen}
                setIsOpen={() => {
                  setIsNodeSelectorOpen(!isNodeSelectorOpen);
                  setIsColorSelectorOpen(false);
                  setIsLinkSelectorOpen(false);
                }}
              />
              <LinkSelector
                isOpen={isLinkSelectorOpen}
                setIsOpen={() => {
                  setIsLinkSelectorOpen(!isLinkSelectorOpen);
                  setIsColorSelectorOpen(false);
                  setIsNodeSelectorOpen(false);
                }}
              />

              <TextButtons />
              <ColorSelector
                isOpen={isColorSelectorOpen}
                setIsOpen={() => {
                  setIsColorSelectorOpen(!isColorSelectorOpen);
                  setIsNodeSelectorOpen(false);
                  setIsLinkSelectorOpen(false);
                }}
              />
            </EditorBubble>
          </EditorContent>
        </div>
      </Editor>
    </div>
  );
}
