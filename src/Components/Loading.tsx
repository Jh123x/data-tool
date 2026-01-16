import { Skeleton } from 'antd';

export const Loading = () => {
  return <Skeleton.Input
    size='large'
    block={true}
    style={{
      height: '40vh'
    }}
    active={true}
  />
}






