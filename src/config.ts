import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'

function configureLibraryForIcons(): void {
  library.add(faArrowLeft)
  library.add(faSearch)
}

export default function config(): void {
  configureLibraryForIcons()
}
