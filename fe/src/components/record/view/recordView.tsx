import { Card } from '@mui/material';
import {FC} from 'react';
import { Record } from '../../../types/Record';

// <div key={record.id}>
//                   <div  onClick={() => onSelect(record)}>{record.date}</div>
//                   <div>{record.desc}</div>
//                   <div>{record.millage}</div>
//                   <div>{record.type}</div>
//                   <div>Img count: {record.imageCount}</div>
//                   { record.imageCount > 0 && <img src={`${config.imageUrlPrefix}${record.id}-0.jpg`} alt="record"/>}
//                   <Button onClick={() => onEdit(record)}>Edit</Button>
//                   <Button onClick={() => onDelete(record)}>Delete</Button>
//                 </div>
interface Props{
    r: Record
}
export const RecordView: FC<Props> = ({r}) => {
    return <Card>{r.id}</Card>
}