import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'

// This improves the application perfomance, seeing that only these icons will be loaded in the bundle.
function configureLibraryForIcons(): void {
  library.add(faArrowLeft)
  library.add(faSearch)
}

export default function doInitialConfiguration(): void {
  configureLibraryForIcons()
}
