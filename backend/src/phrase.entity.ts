import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export class Phrase {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    text: string

    @OneToOne(() => Phrase, (phrase) => phrase.next, { nullable: true })
    @JoinColumn()
    next?: Phrase
}
