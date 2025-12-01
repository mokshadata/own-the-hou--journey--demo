export default function PageButton({ relativePosition, chapter, section, module, chapterTitle, sectionTitle, moduleTitle, baseURL }) {
  return (<a
    role="button"
    aria-label={relativePosition}
    href={`${baseURL}chapters/${[chapter, section, module].filter((param) => (param)).join('/')}/`}
  >
    <div>
      <small><strong>{chapterTitle}</strong> <i>{sectionTitle}</i></small>
      <strong>{moduleTitle}</strong>
    </div>
  </a>)
}