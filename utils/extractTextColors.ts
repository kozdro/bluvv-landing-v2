export default (richtext: any): string[] => {
  const colors = new Set<string>()

  const headingNode = richtext?.content?.find((n: any) => n.type === 'heading')

  headingNode?.content?.forEach((part: any) => {
    part?.marks?.forEach((mark: any) => {
      if (mark.type === 'textStyle' && mark.attrs?.color) {
        colors.add(mark.attrs.color)
      }
    })
  })

  return Array.from(colors)
}
