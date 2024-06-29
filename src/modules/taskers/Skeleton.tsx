import ContentLoader, { Rect } from 'react-content-loader/native'

interface SkeletonProps {
  width: string | number
  height: number
  borderRadius?: number
}

export function Skeleton({ width, height, borderRadius = 16 }: SkeletonProps) {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      backgroundColor="#B3B3B3"
      foregroundColor="#D0D0D0"
    >
      <Rect
        x="0"
        y="0"
        rx={borderRadius}
        ry={borderRadius}
        width={width}
        height={height}
      />
    </ContentLoader>
  )
}
