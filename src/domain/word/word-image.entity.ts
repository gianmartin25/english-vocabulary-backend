export class WordImageEntity {
    private id: number;
    private verbId: string;
    private name: string;
    private url: string;
    private createdAt: Date;
    private updatedAt: Date;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getVerbId(): string {
        return this.verbId;
    }

    public setVerbId(verbId: string): void {
        this.verbId = verbId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }
}