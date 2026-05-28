-- AlterTable
CREATE SEQUENCE demand_id_seq;
ALTER TABLE "Demand" ALTER COLUMN "id" SET DEFAULT nextval('demand_id_seq');
ALTER SEQUENCE demand_id_seq OWNED BY "Demand"."id";
