export default function PageButton({ relativePosition, currentChapter, chapter, section, module, chapterTitle, sectionTitle, moduleTitle, baseURL }) {
  return (<a
    role="button"
    aria-label={relativePosition}
    href={`${baseURL}chapters/${[chapter, section, module].filter((param) => (param)).join('/')}/${window.location.search}`}
  >
    <div>
      <small>{(currentChapter !== chapter) && <strong>{chapterTitle}</strong> || <></>} {false && <i>{sectionTitle}</i> || <></>}</small>
      <strong>{moduleTitle}</strong>
    </div>
  </a>)
}