export default function JourneyMap({ journeyMap, base_url }) {
  return (<div class="menu-list">
      {
        journeyMap.map((topLevel) => (
          <div
            class="frame"
          >
            <a
              role="link"
              data-menu-type="chapter"
              href={`${base_url}chapters/${topLevel.chapter}/`}
            >
              <div>
                {topLevel.title}
              </div>
            </a>
            <ol>
              {topLevel.sections.map((midLevel) => (
                <li>
                  <a
                    role="link"
                    data-menu-type="section"
                    href={`${base_url}chapters/${topLevel.chapter}/${midLevel.section}/${ midLevel.modules.length && `${midLevel.modules[0].module}/` || ''}`}
                  >{midLevel.title}</a>
                  <ol>
                    {midLevel.modules.filter((pageLevel) => (pageLevel.item)).map((pageLevel) => (
                      <li>
                        <a
                          role="link"
                          data-menu-type="page"
                          href={`${base_url}chapters/${topLevel.chapter}/${midLevel.section}/${pageLevel.module}/`}
                        >{pageLevel.item.data.name}</a>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
              <li>
                <a
                  role="link"
                  data-menu-type="section"
                  href={`${base_url}chapters/${topLevel.chapter}/review/`}
                >Check-In</a>
              </li>
            </ol>
          </div>
        ))
      }
  </div>)
}
