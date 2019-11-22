export const initialState = {
  existingTagList: [],
  propagandaData: [],
  selectedTags: {},
  customTagList: [],
  loadingStatus: {
    tags: false,
    propaganda: false,
  },
  isImgLoading: false,
  currentIndex: 0,
  score: 0,
  shouldShowDialog: false,
  shouldShowHelpText: false,
  isPepeSmiling: false,
  isBrowserView: true,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROPAGANDA": {
      const { shouldShowLoader } = action.payload

      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          propaganda: shouldShowLoader,
        },
      }
    }

    case "FETCH_PROPAGANDA_SUCCESS": {
      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          propaganda: false,
        },
        propagandaData: [...state.propagandaData, ...action.payload],
      }
    }

    case "FETCH_PROPAGANDA_FAILED": {
      throw new Error("FETCH_PROPAGANDA_FAILED")
    }

    case "NEXT_PROPAGANDA": {
      return {
        ...state,
        selectedTags: [],
        customTagList: [],
        currentIndex: state.currentIndex + 1,
        isImgLoading: true,
      }
    }

    case "UPDATE_TAG_SELECTION": {
      const { id } = action.payload
      const { selectedTags } = state
      const isTagAlreadySelected = !!selectedTags[id]
      const newSelectedTags = { ...selectedTags }

      if (isTagAlreadySelected) {
        newSelectedTags[id] = false
      } else {
        newSelectedTags[id] = true
      }

      return { ...state, selectedTags: newSelectedTags }
    }

    case "ADD_CUSTOM_TAG": {
      const { customTagList } = action.payload

      return {
        ...state,
        customTagList,
      }
    }

    case "REMOVE_CUSTOM_TAG": {
      const { customTagList } = state
      const { tag } = action.payload
      const newTagList = customTagList.filter(item => item.name !== tag)

      return {
        ...state,
        customTagList: newTagList,
      }
    }

    case "IMAGE_ON_LOAD": {
      return {
        ...state,
        isImgLoading: false,
      }
    }

    case "GET_TAGS": {
      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          tags: true,
        },
      }
    }

    case "GET_TAGS_SUCCESS": {
      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          tags: false,
        },
        existingTagList: [...action.payload],
      }
    }

    case "INCREASE_SCORE": {
      return {
        ...state,
        score: Math.floor((state.score + action.payload) * 1.1),
        isPepeSmiling: true,
      }
    }

    case "RESET_SMILE": {
      return {
        ...state,
        isPepeSmiling: false,
      }
    }

    case "OPEN_DIALOG": {
      return {
        ...state,
        shouldShowDialog: true,
      }
    }

    case "CLOSE_DIALOG": {
      return {
        ...state,
        shouldShowDialog: false,
      }
    }

    case "TOGGLE_HELP_TEXT": {
      return {
        ...state,
        shouldShowHelpText: !state.shouldShowHelpText,
      }
    }

    case "UPDATE_DEVICE_VIEW_TYPE": {
      return {
        ...state,
        isBrowserView: action.payload,
      }
    }

    default:
      throw new Error()
  }
}
