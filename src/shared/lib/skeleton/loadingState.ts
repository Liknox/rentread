class LoadingState {
  private static instance: LoadingState
  private loadedSections: Record<string, boolean> = {}

  private constructor() {}

  public static getInstance(): LoadingState {
    if (!LoadingState.instance) {
      LoadingState.instance = new LoadingState()
    }
    return LoadingState.instance
  }

  public hasLoaded(section: string): boolean {
    return this.loadedSections[section] || false
  }

  public markAsLoaded(section: string): void {
    this.loadedSections[section] = true
  }
}

export const loadingState = LoadingState.getInstance()
